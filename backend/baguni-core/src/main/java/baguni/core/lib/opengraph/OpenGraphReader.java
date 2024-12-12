package baguni.core.lib.opengraph;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * @author minkyeu kim
 * 현재 구현은 Jsoup으로 Head, Body 등 전체 페이지를 파싱합니다.
 * 최적화를 고려한다면 <Head></Head> 부분만 input stream으로 읽어서
 * 필요한 부분만 파싱 하는 방식으로 개선이 필요합니다.
 * TODO: 추후 HttpClient 말고 RestClient로 리팩토링
 */
public class OpenGraphReader {

	private final OpenGraphOption openGraphOption;

	public OpenGraphReader(OpenGraphOption openGraphOption) {
		this.openGraphOption = openGraphOption;
	}

	public Map<String, String> read(URI uri) throws OpenGraphException {
		Map<String, String> result = new HashMap<>();
		HttpRequest httpRequest = HttpRequest.newBuilder(uri)
											 .header("User-Agent", openGraphOption.getUserAgent())
											 .build();
		HttpClient httpClient = HttpClient.newBuilder()
										  .connectTimeout(openGraphOption.getHttpRequestTimeoutyDuration())
										  .followRedirects(HttpClient.Redirect.NORMAL)
										  .build();
		try {
			HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString(
				Charset.forName(openGraphOption.getHttpResponseDefaultCharsetName())));
			Document htmlResponse = Jsoup.parse(response.body());
			Element head = htmlResponse.head();
			Elements headClildElements = head.children();
			headClildElements
				.stream()
				.filter(
					o -> "meta".equals(o.nodeName()) && o.hasAttr("property") && o.attr("property").startsWith("og:"))
				.forEach(o -> {
					String key = o.attr("property");
					String value = o.attr("content");
					result.put(key, value);
				});
		} catch (IOException | InterruptedException e) {
			throw new OpenGraphException("Error occurred when reading OG tags.", e);
		}
		return result;
	}
}

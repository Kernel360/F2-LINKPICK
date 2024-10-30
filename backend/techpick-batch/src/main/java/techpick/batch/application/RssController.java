package techpick.batch.application;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PostConstruct;
import techpick.batch.domain.rss.dto.RssBlogCommand;
import techpick.batch.domain.rss.dto.RssBlogResult;
import techpick.batch.domain.rss.service.RssService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RssController {
	private final RssService rssService;

	// TODO : 이후 관리자 기능 구현 후 관리자 기능으로 이관 예정..
	@PostConstruct
	public void init() {
		List<RssBlogCommand.Create> blogList = List.of(
			new RssBlogCommand.Create("카카오페이", "https://tech.kakaopay.com/rss"),
			new RssBlogCommand.Create("NHN Cloud", "https://meetup.toast.com/rss"),
			new RssBlogCommand.Create("데브시스터즈", "https://tech.devsisters.com/rss.xml"),
			new RssBlogCommand.Create("뱅크샐러드", "https://blog.banksalad.com/rss.xml"),
			new RssBlogCommand.Create("마켓컬리", "https://helloworld.kurly.com/feed"),
			new RssBlogCommand.Create("Gmarket", "https://dev.gmarket.com/rss"),
			new RssBlogCommand.Create("여기어때", "https://techblog.gccompany.co.kr/feed"),
			new RssBlogCommand.Create("올리브영", "https://oliveyoung.tech/rss.xml"),
			new RssBlogCommand.Create("AWS", "https://aws.amazon.com/ko/blogs/korea/feed/"),
			new RssBlogCommand.Create("Toss", "https://toss.tech/rss.xml"),
			new RssBlogCommand.Create("우아한형제들", "https://techblog.woowahan.com/feed/"),
			new RssBlogCommand.Create("카카오", "https://tech.kakao.com/posts/feed"),
			new RssBlogCommand.Create("라인", "https://techblog.lycorp.co.jp/ko/feed/index.xml"),
			new RssBlogCommand.Create("SK플래닛", "https://techtopic.skplanet.com/rss"),
			new RssBlogCommand.Create("스마일게이트", "https://smilegate.ai/feed/"),
			new RssBlogCommand.Create("29CM", "https://medium.com/feed/29cm"),
			new RssBlogCommand.Create("CJ OnStyle", "https://medium.com/feed/cj-onstyle"),
			new RssBlogCommand.Create("브랜디", "https://labs.brandi.co.kr/feed"),
			new RssBlogCommand.Create("넷마블", "https://netmarble.engineering/rss"),
			new RssBlogCommand.Create("11번가", "https://11st-tech.github.io/rss/"),
			new RssBlogCommand.Create("원티드", "https://medium.com/feed/wantedjobs"),
			new RssBlogCommand.Create("인프랩", "https://tech.inflab.com/rss.xml"),
			new RssBlogCommand.Create("티빙", "https://medium.com/feed/tving-team"),
			new RssBlogCommand.Create("리디", "https://ridicorp.com/story-category/tech-blog/feed/")
		);

		Set<String> urlSet = rssService.getAllRssBlog().stream()
			.map(RssBlogResult::url)
			.collect(Collectors.toSet());
		for (var blog : blogList) {
			if (!urlSet.contains(blog.url())) {
				rssService.saveRssBlog(blog);
			}
		}
	}
}

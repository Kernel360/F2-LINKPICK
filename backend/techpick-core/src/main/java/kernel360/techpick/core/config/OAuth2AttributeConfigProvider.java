package kernel360.techpick.core.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;

@Component
@ConfigurationProperties("oauth2-attribute-config-provider")
@Getter // yaml 값을 getter 로 주입..
public class OAuth2AttributeConfigProvider {

	private final Map<String, Map<String, String>> attributeConfig = new HashMap<>();

	public Map<String, String> getAttributeConfig(String providerId) {
		return attributeConfig.get(providerId);
	}
}

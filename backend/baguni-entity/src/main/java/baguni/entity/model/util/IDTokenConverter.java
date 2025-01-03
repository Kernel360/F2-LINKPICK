package baguni.entity.model.util;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

/**
 * "@Converter" 를 entity 필드에 넣지 않아도 타입에 자동 적용
 */
@Converter
public class IDTokenConverter implements AttributeConverter<IDToken, String> {

	@Override
	public String convertToDatabaseColumn(IDToken attribute) {
		return attribute != null ? attribute.toString() : null;
	}

	@Override
	public IDToken convertToEntityAttribute(String dbData) {
		return IDToken.fromString(dbData);
	}
}

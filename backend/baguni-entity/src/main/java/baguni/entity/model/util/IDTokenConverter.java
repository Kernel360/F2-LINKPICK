package baguni.entity.model.util;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

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

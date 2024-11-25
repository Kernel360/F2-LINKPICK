package techpick.api.domain.sharedFolder.dto;

import lombok.Builder;

@Builder
public record TagNode(String name, Integer colorNumber) {
}

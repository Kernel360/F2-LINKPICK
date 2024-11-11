package techpick.api.infrastructure.pick;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.link.dto.LinkInfo;
import techpick.api.domain.pick.dto.PickCommand;
import techpick.core.model.link.Link;
import techpick.core.model.link.LinkRepository;

@Repository
@RequiredArgsConstructor
public class PickBulkDataHandler {

	private final JdbcTemplate jdbcTemplate;
	private final LinkRepository linkRepository;

	@Transactional
	public Link getOrCreateLink(LinkInfo linkInfo) {
		return linkRepository.findByUrl(linkInfo.url())
			.orElseGet(() -> {
				Link link = Link.builder()
					.url(linkInfo.url())
					.title(linkInfo.title())
					.description(linkInfo.description())
					.imageUrl(linkInfo.imageUrl())
					.invalidatedAt(linkInfo.invalidatedAt())
					.build();
				return linkRepository.save(link);
			});
	}

	@Transactional
	public void bulkInsertPick(List<PickCommand.Create> pickList) {
		String sql = "INSERT INTO pick (user_id, link_id, parent_folder_id, title, tag_order, memo, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
			@Override
			public void setValues(PreparedStatement ps, int i) throws SQLException {
				PickCommand.Create pick = pickList.get(i);
				Link link = getOrCreateLink(pick.linkInfo());
				ps.setLong(1, pick.userId());
				ps.setLong(2, link.getId());
				ps.setLong(3, pick.parentFolderId());
				ps.setString(4, pick.title());
				ps.setString(5,
					String.join(" ", pick.tagIdOrderedList().stream().map(String::valueOf).toArray(String[]::new)));
				ps.setString(6, pick.memo());
				ps.setString(7, String.valueOf(LocalDateTime.now()));
				ps.setString(8, String.valueOf(LocalDateTime.now()));
			}

			@Override
			public int getBatchSize() {
				return pickList.size();
			}
		});
	}
}

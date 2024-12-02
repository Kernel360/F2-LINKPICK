package techpick.ranking;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ranking")
@Tag(name = "Rank API", description = "랭킹 API")
public class RankingController {

    // TODO: 시간 나라별 기준 이런거 검토 필요합니다.
    private final LinkViewRankingService linkViewRankingService;

    @GetMapping("/daily")
    public ResponseEntity<?> getDailyRanking(
        @RequestParam int count
    ) {
        var result = linkViewRankingService.getTopViewsByDay(count);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/weekly")
    public ResponseEntity<?> getWeeklyRanking(
        @RequestParam int count
    ) {
        var result = linkViewRankingService.getTopViewsByPast7Days(count);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/monthly")
    public ResponseEntity<?> getMonthlyRanking(
        @RequestParam int count
    ) {
        var result = linkViewRankingService.getTopViewByPast30Days(count);
        return ResponseEntity.ok(result);
    }
}

package techpick.ranking;

import java.time.LocalDate;
import java.util.List;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.core.rabbitmq.Event;
import techpick.core.config.RabbitmqConfig;

@Slf4j
@Service
@RequiredArgsConstructor
public class LinkViewRankingService {

    private final LinkViewCountRepository linkViewCountRepository;

    @RabbitListener(queues = {RabbitmqConfig.QUEUE.Q1})
    public void readViewEvent(Event event) {
        var date = event.getOccuredOn().toLocalDate();
        var url = event.getUrl();
        var linkViewCount = linkViewCountRepository
            .findLinkViewCountByDateAndUrl(date, url)
            .orElseGet(() -> new LinkViewCount(date, url, 0L))
            .incrementCount();
        linkViewCountRepository.save(linkViewCount);
    }

    // DAY-RANK : GET TOP N (= count)
    public List<LinkViewCount> getTopViewsByDay(int maxCount) {
        var currentDay = LocalDate.now();
        return linkViewCountRepository.findByDate(currentDay, Sort.by(Sort.Direction.DESC, "count"),
            Limit.of(maxCount));
    }

    // WEEK-RANK : GET TOP N (= count)
    // 오늘 기준 지난 일주일
    public List<LinkViewCount> getTopViewsByPast7Days(int maxCount) {
        var currentDay = LocalDate.now();
        return linkViewCountRepository.findByDateBetweenOrderByCountDesc(
            currentDay.minusDays(7),
            currentDay.plusDays(1), // TODO: GT를 GTE로 바꾸는 방법이 뭘까?
            Limit.of(maxCount)
        );
    }

    // MONT:-RANK : GET TOP N (= count)
    public List<LinkViewCount> getTopViewByPast30Days(int maxCount) {
        var currentMonth = LocalDate.now();
        return linkViewCountRepository.findByDateBetweenOrderByCountDesc(
            currentMonth.minusDays(30),
            currentMonth.plusDays(1), // TODO: GT를 GTE로 바꾸는 방법이 뭘까?
            Limit.of(maxCount)
        );
    }
}

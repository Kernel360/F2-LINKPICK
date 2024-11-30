package techpick.collector.application;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.collector.domain.ProducerService;
import techpick.collector.dto.MessageDto;
import techpick.collector.entity.Message;

@Slf4j
@RestController
@RequestMapping("/api/producer")
@RequiredArgsConstructor
public class ProducerController {

	private final ProducerService producerService;

	@GetMapping
	public ResponseEntity<List<Message>> findAllMessage() {
		return ResponseEntity.ok(producerService.findMessage());
	}

	@PostMapping("/send/direct")
	public ResponseEntity<?> directSendMessage(@RequestBody MessageDto messageDto) {
		String result = "";

		producerService.directSendMessage(messageDto);
		return ResponseEntity.ok(result);
	}

	@PostMapping("/send/fanout")
	public ResponseEntity<?> fanoutSendMessage(@RequestBody MessageDto messageDto) {
		String result = "";

		producerService.fanoutSendMessage(messageDto);
		return ResponseEntity.ok(result);
	}
}

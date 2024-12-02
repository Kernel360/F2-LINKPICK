// package techpick.ranking.domain;
//
// import java.util.List;
//
// import org.springframework.amqp.rabbit.core.RabbitTemplate;
// import org.springframework.stereotype.Service;
//
// import com.fasterxml.jackson.core.JsonProcessingException;
// import com.fasterxml.jackson.databind.ObjectMapper;
//
// import lombok.RequiredArgsConstructor;
// import lombok.extern.slf4j.Slf4j;
// import techpick.ranking.dto.MessageDto;
//
// @Slf4j
// @Service
// @RequiredArgsConstructor
// public class ProducerService {
//
//     private final RabbitTemplate rabbitTemplate;
//     private final MessageRepository messageRepository;
//     private final PickPickRepository pickPickRepository;
//
//     public List<Message> findMessage() {
//         return messageRepository.findAll();
//     }
//
//     public void directSendMessage(MessageDto messageDto) {
//         try {
//             ObjectMapper objectMapper = new ObjectMapper();
//             String objectToJson = objectMapper.writeValueAsString(messageDto);
//
//             rabbitTemplate.convertAndSend("exchange.direct", "direct.key", objectToJson);
//
//             Message message = messageRepository.save(
//                 Message
//                     .builder().title(messageDto.getTitle()).message(messageDto.getMessage()).build());
//             pickPickRepository.save(PickPick
//                 .builder()
//                 .url("https://www.naver.com")
//                 .title("제목")
//                 .parentFolderId(1L)
//                 .tagIdOrderedList(List.of(1L, 2L, 3L))
//                 .build());
//         } catch (JsonProcessingException e) {
//             System.out.println("파싱 오류 발생");
//         }
//     }
//
//     public void fanoutSendMessage(MessageDto messageDto) {
//         try {
//             ObjectMapper objectMapper = new ObjectMapper();
//             String objectToJson = objectMapper.writeValueAsString(messageDto);
//
//             rabbitTemplate.convertAndSend("exchange.fanout", "", objectToJson);
//         } catch (JsonProcessingException e) {
//             System.out.println("파싱 오류 발생");
//         }
//     }
// }

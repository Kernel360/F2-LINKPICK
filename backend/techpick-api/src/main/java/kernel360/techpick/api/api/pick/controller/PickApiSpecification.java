package kernel360.techpick.api.api.pick.controller;

public interface PickApiSpecification {

	// [ 내가 해당 링크를 픽한 적이 있는지 확인 ]
	// GET api/picks?link={url}
	// -------------------- no request body
	// -------------------- Response Body = {
	//                                        pick_id: nullable (null == 픽 안함)
	//                                      }

	// [ 나의 픽 상세 조회 ]
	// GET api/picks/{pick_id}
	// -------------------- Request Body = X
	// -------------------- Response Body = { parent_folder_id, 태그, 제목 ... 등등 }

	// [ 나의 픽 정보 수정 - null이 아닌 값만 업데이트 ]
	// PATCH api/picks/data/{pick_id}
	// -------------------- Request Body = {
	//                                       memo: nullable,
	//                                       title: nullable,
	//                                       tags: nullable
	//                                      }

	// [ 나의 픽 위치 수정 - 값이 null일 때 "생성"과 다르게 적용되는 점 주의 ]
	// PATCH api/picks/location/{pick_id}
	// -------------------- Request Body = {
	//                                       parent_folder_id: nullable --> 있다면 해당 폴더로 소속되게, 없으면 변경 없음
	//                                       order_idx : 호출 된 이상, null일 수 없음!
	//                                      }

	// [ 나의 픽 생성 ]
	// POST api/picks/
	// -------------------- Request Body = {
	//                                       data: {
	//                                         title: nullable, --> null일 경우 빈 문자열로 설정
	//                                         memo: nullable,  --> null일 경우 빈 문자열로 설정
	//                                         tags: nullable,  --> null일 경우 빈 태그로 설정
	//                                         url: <!!필수값!!>, --> null일 경우 예외 발생
	//                                         ...
	//                                       },
	//                                       location: {
	//                                         parent_folder_id: nullable --> 있다면 해당 폴더로 소속되게, 없으면 unclassified로
	//                                         order_idx : nullable --> 0이면 픽들 중 최상단 위치, 없으면 제일 마지막.
	//                                       }
	//                                      }
	// -------------------- Response Body = { created_pick_id }

	// [ 나의 픽 삭제 조회 ]
	// GET api/picks/{pick_id}
	// -------------------- no request body
	// -------------------- no response body
}

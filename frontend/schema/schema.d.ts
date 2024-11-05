/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/api/tags": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 태그 조회
         * @description 사용자가 등록한 전체 태그를 조회합니다.
         */
        get: operations["getAllUserTag"];
        put?: never;
        /**
         * 태그 추가
         * @description 새로운 태그를 추가합니다.
         */
        post: operations["createTag"];
        /**
         * 태그 삭제
         * @description 사용자가 등록한 태그를 삭제합니다.
         */
        delete: operations["deleteTag"];
        options?: never;
        head?: never;
        /**
         * 태그 수정
         * @description 사용자가 등록한 태그를 수정합니다.
         */
        patch: operations["updateTag"];
        trace?: never;
    };
    "/api/picks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 폴더 리스트 내 픽 리스트 조회
         * @description 해당 폴더 리스트 각각의 픽 리스트를 조회합니다.
         */
        get: operations["getFolderChildPickList"];
        put?: never;
        /**
         * 픽 생성
         * @description 픽을 생성합니다.
         */
        post: operations["savePick"];
        /**
         * 픽 삭제
         * @description 휴지통에 있는 픽만 삭제 가능합니다.
         */
        delete: operations["deletePick"];
        options?: never;
        head?: never;
        /**
         * 픽 내용 수정
         * @description 픽 내용(제목, 메모)을 수정합니다.
         */
        patch: operations["updatePick"];
        trace?: never;
    };
    "/api/folders": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 루트 폴더와 하위 리스트 조회
         * @description 사용자의 루트 폴더와 루트 하위 전체 폴더를 조회합니다.
         */
        get: operations["getAllRootFolderList"];
        put?: never;
        /**
         * 폴더 추가
         * @description 새로운 폴더를 추가합니다.
         */
        post: operations["createFolder"];
        /**
         * 폴더 삭제
         * @description 사용자가 등록한 폴더를 삭제합니다.
         */
        delete: operations["deleteFolder"];
        options?: never;
        head?: never;
        /**
         * 폴더 수정
         * @description 사용자가 등록한 폴더를 수정합니다.
         */
        patch: operations["updateFolder"];
        trace?: never;
    };
    "/api/tags/location": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * 태그 이동
         * @description 사용자가 등록한 태그의 순서를 변경합니다.
         */
        patch: operations["moveTag"];
        trace?: never;
    };
    "/api/picks/location": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * 픽 이동
         * @description 픽을 같은 폴더 혹은 다른 폴더로 이동합니다.
         */
        patch: operations["movePick"];
        trace?: never;
    };
    "/api/folders/location": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * 폴더 이동
         * @description 사용자가 등록한 폴더를 이동합니다.
         */
        patch: operations["moveFolder"];
        trace?: never;
    };
    "/api/picks/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 픽 상세 조회
         * @description 픽을 상세 조회합니다.
         */
        get: operations["getPick"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/picks/link": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 링크 픽 여부 조회
         * @description 해당 링크를 픽한 적이 있는지 확인합니다.
         */
        get: operations["getPickUrl"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/folders/{id}/children": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 자식 폴더 리스트 조회
         * @description 특정 폴더의 자식 폴더 리스트를 조회합니다.
         */
        get: operations["getChildrenFolder"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/folders/basic": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 기본 폴더 리스트 조회
         * @description 사용자의 루트, 미분류, 휴지통 폴더를 조회합니다.
         */
        get: operations["getBasicFolderList"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        "techpick.api.application.tag.dto.TagApiRequest$Create": {
            /** @example SpringBoot */
            name: string;
            /**
             * Format: int32
             * @example 12
             */
            colorNumber: number;
        };
        "techpick.api.application.tag.dto.TagApiResponse$Create": {
            /** Format: int64 */
            id?: number;
            name?: string;
            /** Format: int32 */
            colorNumber?: number;
        };
        "techpick.api.application.pick.dto.PickApiRequest$Create": {
            /** @example Record란? */
            title?: string;
            /** @example Java 레코드에 관한 글 */
            memo?: string;
            /** @example [
             *       4,
             *       5,
             *       2,
             *       1,
             *       3
             *     ] */
            tagIdOrderedList?: number[];
            /**
             * Format: int64
             * @example 1
             */
            parentFolderId?: number;
            linkInfo?: components["schemas"]["techpick.api.domain.link.dto.LinkInfo"];
        };
        "techpick.api.domain.link.dto.LinkInfo": {
            /** @example https://velog.io/@hyeok_1212/Java-Record-%EC%82%AC%EC%9A%A9%ED%95%98%EC%8B%9C%EB%82%98%EC%9A%94 */
            url: string;
            /** @example [Java] Record 사용하시나요? */
            title?: string;
            /** @example IntelliJ : 레코드 써봐 */
            description?: string;
            /** @example https://velog.velcdn.com/images/hyeok_1212/post/5ea148fb-1490-4b03-811e-222b4d26b65e/image.png */
            imageUrl?: string;
            /**
             * Format: date-time
             * @example 2024-10-19T10:46:30.035Z
             */
            invalidatedAt?: string;
        };
        "techpick.api.application.pick.dto.PickApiResponse$Pick": {
            /** Format: int64 */
            id?: number;
            title?: string;
            memo?: string;
            linkInfo?: components["schemas"]["techpick.api.domain.link.dto.LinkInfo"];
            tagIdOrderedList?: number[];
            /** Format: date-time */
            createdAt?: string;
            /** Format: date-time */
            updatedAt?: string;
        };
        "techpick.api.application.folder.dto.FolderApiRequest$Create": {
            /** @example backend */
            name: string;
            /**
             * Format: int64
             * @example 3
             */
            parentFolderId: number;
        };
        "techpick.api.application.folder.dto.FolderApiResponse": {
            /** Format: int64 */
            id?: number;
            name?: string;
            /** @enum {string} */
            folderType?: "UNCLASSIFIED" | "RECYCLE_BIN" | "ROOT" | "GENERAL";
            /** Format: int64 */
            parentFolderId?: number;
            childFolderIdOrderedList?: number[];
        };
        "techpick.api.application.tag.dto.TagApiRequest$Update": {
            /**
             * Format: int64
             * @example 2
             */
            id: number;
            /** @example new tag name */
            name: string;
            /**
             * Format: int32
             * @example 7
             */
            colorNumber: number;
        };
        "techpick.api.application.tag.dto.TagApiRequest$Move": {
            /**
             * Format: int64
             * @example 3
             */
            id: number;
            /**
             * Format: int32
             * @example 1
             */
            orderIdx: number;
        };
        "techpick.api.application.pick.dto.PickApiRequest$Update": {
            /**
             * Format: int64
             * @example 1
             */
            id: number;
            /** @example Record란 뭘까? */
            title?: string;
            /** @example Java Record */
            memo?: string;
            /** @example [
             *       4,
             *       5,
             *       2,
             *       1
             *     ] */
            tagIdOrderedList?: number[];
        };
        "techpick.api.application.pick.dto.PickApiRequest$Move": {
            /** @example [
             *       1,
             *       2
             *     ] */
            idList: number[];
            /**
             * Format: int64
             * @example 3
             */
            destinationFolderId: number;
            /**
             * Format: int32
             * @example 0
             */
            orderIdx?: number;
        };
        "techpick.api.application.folder.dto.FolderApiRequest$Update": {
            /**
             * Format: int64
             * @example 3
             */
            id: number;
            /** @example SpringBoot */
            name: string;
        };
        "techpick.api.application.folder.dto.FolderApiRequest$Move": {
            /** @example [
             *       12,
             *       11,
             *       4,
             *       5,
             *       1,
             *       6
             *     ] */
            idList: number[];
            /**
             * Format: int64
             * @example 3
             */
            destinationFolderId: number;
            /**
             * Format: int32
             * @example 2
             */
            orderIdx?: number;
        };
        "techpick.api.application.tag.dto.TagApiResponse$Read": {
            /** Format: int64 */
            id?: number;
            name?: string;
            /** Format: int32 */
            colorNumber?: number;
        };
        "techpick.api.application.pick.dto.PickApiResponse$FolderPickList": {
            /** Format: int64 */
            folderId?: number;
            pickList?: components["schemas"]["techpick.api.domain.pick.dto.PickResult$Pick"][];
        };
        "techpick.api.domain.pick.dto.PickResult$Pick": {
            /** Format: int64 */
            id?: number;
            title?: string;
            memo?: string;
            linkInfo?: components["schemas"]["techpick.api.domain.link.dto.LinkInfo"];
            /** Format: int64 */
            parentFolderId?: number;
            tagIdOrderedList?: number[];
            /** Format: date-time */
            createdAt?: string;
            /** Format: date-time */
            updatedAt?: string;
        };
        "techpick.api.application.tag.dto.TagApiRequest$Delete": {
            /**
             * Format: int64
             * @example 4
             */
            id: number;
        };
        "techpick.api.application.pick.dto.PickApiRequest$Delete": {
            /** @example [
             *       1
             *     ] */
            idList: number[];
        };
        "techpick.api.application.folder.dto.FolderApiRequest$Delete": {
            /** @example [
             *       12,
             *       11,
             *       4,
             *       5,
             *       1,
             *       6
             *     ] */
            idList: number[];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getAllUserTag: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 조회 성공 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.tag.dto.TagApiResponse$Read"][];
                };
            };
        };
    };
    createTag: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["techpick.api.application.tag.dto.TagApiRequest$Create"];
            };
        };
        responses: {
            /** @description 태그 추가 성공 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.tag.dto.TagApiResponse$Create"];
                };
            };
            /** @description 중복된 태그 이름 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteTag: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["techpick.api.application.tag.dto.TagApiRequest$Delete"];
            };
        };
        responses: {
            /** @description 태그 삭제 성공 */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 본인 태그만 삭제할 수 있습니다. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateTag: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["techpick.api.application.tag.dto.TagApiRequest$Update"];
            };
        };
        responses: {
            /** @description 태그 수정 성공 */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 중복된 태그 이름 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 본인 태그만 수정할 수 있습니다. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getFolderChildPickList: {
        parameters: {
            query: {
                /**
                 * @description 조회할 폴더 ID 목록
                 * @example 1, 2, 3
                 */
                folderIdList: number[];
                /**
                 * @description 검색 토큰 목록
                 * @example 리액트, 쿼리, 서버
                 */
                searchTokenList?: string[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 픽 리스트 조회 성공 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.pick.dto.PickApiResponse$FolderPickList"][];
                };
            };
        };
    };
    savePick: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["techpick.api.application.pick.dto.PickApiRequest$Create"];
            };
        };
        responses: {
            /** @description 픽 생성 성공 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.pick.dto.PickApiResponse$Pick"];
                };
            };
            /** @description 잘못된 태그 접근 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.pick.dto.PickApiResponse$Pick"];
                };
            };
            /** @description 접근할 수 없는 폴더 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.pick.dto.PickApiResponse$Pick"];
                };
            };
        };
    };
    deletePick: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["techpick.api.application.pick.dto.PickApiRequest$Delete"];
            };
        };
        responses: {
            /** @description 픽 삭제 성공 */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 휴지통이 아닌 폴더에서 픽 삭제 불가 */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 미확인 서버 에러 혹은 존재하지 않는 픽 삭제 */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updatePick: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["techpick.api.application.pick.dto.PickApiRequest$Update"];
            };
        };
        responses: {
            /** @description 픽 내용 수정 성공 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.pick.dto.PickApiResponse$Pick"];
                };
            };
        };
    };
    getAllRootFolderList: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 조회 성공 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.folder.dto.FolderApiResponse"][];
                };
            };
            /** @description 본인 폴더만 조회할 수 있습니다. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.folder.dto.FolderApiResponse"][];
                };
            };
        };
    };
    createFolder: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["techpick.api.application.folder.dto.FolderApiRequest$Create"];
            };
        };
        responses: {
            /** @description 폴더 추가 성공 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.folder.dto.FolderApiResponse"];
                };
            };
        };
    };
    deleteFolder: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["techpick.api.application.folder.dto.FolderApiRequest$Delete"];
            };
        };
        responses: {
            /** @description 폴더 삭제 성공 */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 기본 폴더는 삭제할 수 없습니다. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 본인 폴더만 삭제할 수 있습니다. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateFolder: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["techpick.api.application.folder.dto.FolderApiRequest$Update"];
            };
        };
        responses: {
            /** @description 폴더 수정 성공 */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 기본 폴더는 수정할 수 없습니다. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 본인 폴더만 수정할 수 있습니다. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    moveTag: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["techpick.api.application.tag.dto.TagApiRequest$Move"];
            };
        };
        responses: {
            /** @description 태그 이동 성공 */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 본인 태그만 이동할 수 있습니다. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    movePick: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["techpick.api.application.pick.dto.PickApiRequest$Move"];
            };
        };
        responses: {
            /** @description 픽 이동 성공 */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 폴더가 존재하지 않음. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    moveFolder: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["techpick.api.application.folder.dto.FolderApiRequest$Move"];
            };
        };
        responses: {
            /** @description 폴더 이동 성공 */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 기본 폴더는 이동할 수 없습니다. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 본인 폴더만 이동할 수 있습니다. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 부모가 다른 폴더들을 동시에 이동할 수 없습니다. */
            406: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getPick: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 픽 상세 조회 성공 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.pick.dto.PickApiResponse$Pick"];
                };
            };
        };
    };
    getPickUrl: {
        parameters: {
            query: {
                link: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 픽 여부 조회 성공 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.pick.dto.PickApiResponse$Pick"];
                };
            };
            /** @description 해당 링크에 대해 픽이 되어 있지 않습니다. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.pick.dto.PickApiResponse$Pick"];
                };
            };
        };
    };
    getChildrenFolder: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 조회 성공 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.folder.dto.FolderApiResponse"][];
                };
            };
            /** @description 본인 폴더만 조회할 수 있습니다. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.folder.dto.FolderApiResponse"][];
                };
            };
        };
    };
    getBasicFolderList: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 조회 성공 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.folder.dto.FolderApiResponse"][];
                };
            };
            /** @description 본인 폴더만 조회할 수 있습니다. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["techpick.api.application.folder.dto.FolderApiResponse"][];
                };
            };
        };
    };
}

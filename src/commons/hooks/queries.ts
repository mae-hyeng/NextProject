import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!) {
        fetchBoard(boardId: $boardId) {
            _id
            writer
            title
            contents
            youtubeUrl
            likeCount
            dislikeCount
            images
            boardAddress {
                _id
                zipcode
                address
                addressDetail
                createdAt
                updatedAt
                deletedAt
            }
            # user null 반환됨
            # user {
            #     # _id
            #     # email
            #     # name
            #     #     picture
            #     # userPoint {
            #         # _id
            #         #         amount
            #         #         user
            #         #         createdAt
            #         #         updatedAt
            #         #         deletedAt
            #     # }
            #     #     createdAt
            #     #     updatedAt
            #     #     deletedAt
            # }
            createdAt
            updatedAt
            deletedAt
        }
    }
`;

export const FETCH_USER = gql`
    query ($email: String!) {
        fetchUser(email: $email) {
            _id
            name
            email
            userPoint {
                _id
                # amount
            }
        }
    }
`;

export const FETCH_BOARDS_COUNT_OF_MINE = gql`
    query fetchBoardsCountOfMine {
        fetchBoardsCountOfMine
    }
`;

// 구매내역
export const FETCH_POINT_TRANSACTIONS_OF_BUYING = gql`
    query fetchPointTransactionsOfBuying($search: String, $page: Int) {
        fetchPointTransactionsOfBuying(search: $search, page: $page) {
            _id
            impUid
            amount
            balance
            status
            statusDetail
            travelproduct {
                name
                seller {
                    # name
                    _id
                    # email
                }
                buyer {
                    _id
                    # name
                }
            }
            createdAt
            updatedAt
        }
    }
`;

// 구매내역 pagination
export const FETCH_POINT_TRANSACTIONS_COUNT_OF_BUYING = gql`
    query fetchPointTransactionsCountOfBuying {
        fetchPointTransactionsCountOfBuying
    }
`;

// 충전내역
export const FETCH_POINT_TRANSACTIONS_OF_LOADING = gql`
    query fetchPointTransactionsOfLoading($search: String, $page: Int) {
        fetchPointTransactionsOfLoading(search: $search, page: $page) {
            _id
            impUid
            amount
            balance
            status
            statusDetail
            travelproduct {
                name
                seller {
                    # name
                    _id
                    # email
                }
                buyer {
                    _id
                    # name
                }
            }
            createdAt
            updatedAt
        }
    }
`;

// 충전내역 pagination
export const FETCH_POINT_TRANSACTIONS_COUNT_OF_LOADING = gql`
    query fetchPointTransactionsCountOfLoading {
        fetchPointTransactionsCountOfLoading
    }
`;

// 판매내역
export const FETCH_POINT_TRANSACTIONS_OF_SELLING = gql`
    query fetchPointTransactionsOfSelling($search: String, $page: Int) {
        fetchPointTransactionsOfSelling(search: $search, page: $page) {
            _id
            impUid
            amount
            balance
            status
            statusDetail
            travelproduct {
                name
                seller {
                    # name
                    _id
                    # email
                }
                buyer {
                    _id
                    # name
                }
            }
            createdAt
            updatedAt
        }
    }
`;

// 충전내역 pagination
export const FETCH_POINT_TRANSACTIONS_COUNT_OF_SELLING = gql`
    query fetchPointTransactionsCountOfSelling {
        fetchPointTransactionsCountOfSelling
    }
`;

// 비밀번호 변경
export const RESET_USER_PASSWORD = gql`
    mutation resetUserPassword($password: String!) {
        resetUserPassword(password: $password)
    }
`;

// 나의 상품 구매 상품 정보
export const FETCH_TRAVEL_PRODUCTS_I_BOUGHT = gql`
    query fetchTravelproductsIBought($search: String, $page: Int) {
        fetchTravelproductsIBought(search: $search, page: $page) {
            name
            price
            soldAt
            createdAt
            updatedAt
        }
    }
`;

// 나의 상품 구매 상품 페이지네이션
export const FETCH_TRAVEL_PRODUCTS_COUNT_I_BOUGHT = gql`
    query fetchTravelproductsCountIBought {
        fetchTravelproductsCountIBought
    }
`;

// 나의 북마크 정보
export const FETCH_TRAVEL_PRODUCTS_I_PICKED = gql`
    query fetchTravelproductsIPicked($search: String, $page: Int) {
        fetchTravelproductsIPicked(search: $search, page: $page) {
            name
            price
            soldAt
            createdAt
            updatedAt
        }
    }
`;

// 나의 북마크 페이지네이션
export const FETCH_TRAVEL_PRODUCTS_COUNT_I_PICKED = gql`
    query fetchTravelproductsCountIPicked {
        fetchTravelproductsCountIPicked
    }
`;

// 나의 구매 항목 정보
export const FETCH_TRAVEL_PRODUCTS_I_SOLD = gql`
    query fetchTravelproductsISold($search: String, $page: Int) {
        fetchTravelproductsISold(search: $search, page: $page) {
            name
            price
            soldAt
            createdAt
            updatedAt
        }
    }
`;

// 나의 구매 항목 페이지네이션
export const FETCH_TRAVEL_PRODUCTS_COUNT_I_SOLD = gql`
    query fetchTravelproductsCountISold {
        fetchTravelproductsCountISold
    }
`;

// 로그아웃
export const LOG_OUT_USER = gql`
    mutation logoutUser {
        logoutUser
    }
`;

// 인기글
export const FETCH_TRAVEL_PRODUCTS_OF_THE_BEST = gql`
    query fetchTravelproductsOfTheBest {
        fetchTravelproductsOfTheBest {
            _id
            name
            remarks
            price
            seller {
                name
            }
            pickedCount
            images
        }
    }
`;

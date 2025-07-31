"use client";

import { QuestionWrite } from "@/components/accommodation-detail/question-write";
import { FETCH_TRAVEL_PRODUCT_QUESTIONS } from "@/components/accommodation-detail/question-write/queries";
import AccommodationDetail from "@/components/accommodation-detail/detail";
import { FETCH_TRAVEL_PRODUCT } from "@/components/accommodation-detail/detail/queries";
import { QuestionList } from "@/components/accommodation-detail/question-list";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FETCH_TRAVEL_PRODUCT_QUESTIONS_ANSWER } from "@/components/accommodation-detail/question-list-item/reply/reply-write/queries";

const AccommodationDetailPage = () => {
    const params = useParams();

    const { data } = useQuery(FETCH_TRAVEL_PRODUCT, {
        variables: { travelproductId: params.travelproductId },
    });

    const { data: questionData, refetch: refetchQuestionData } = useQuery(
        FETCH_TRAVEL_PRODUCT_QUESTIONS,
        {
            variables: { page: 1, travelproductId: params.travelproductId },
        }
    );

    return (
        <>
            <AccommodationDetail data={data} />
            <QuestionWrite isEdit={false} refetchQuestionData={refetchQuestionData} />
            <QuestionList
                data={data}
                questionData={questionData}
                refetchQuestionData={refetchQuestionData}
            />
        </>
    );
};

export default AccommodationDetailPage;

"use client";

import { QuestionWrite } from "@/components/accommodation-detail/question-write";
import { FETCH_TRAVEL_PRODUCT_QUESTIONS } from "@/components/accommodation-detail/question-write/queries";
import AccommodationDetail from "@/components/accommodation-detail/detail";
import { FETCH_TRAVEL_PRODUCT } from "@/components/accommodation-detail/detail/queries";
import { QuestionList } from "@/components/accommodation-detail/question-list";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const AccommodationDetailPage = () => {
    const params = useParams();

    const { data, refetch } = useQuery(FETCH_TRAVEL_PRODUCT, {
        variables: { travelproductId: params.travelproductId },
    });

    const { data: questionData } = useQuery(FETCH_TRAVEL_PRODUCT_QUESTIONS, {
        variables: { page: 1, travelproductId: params.travelproductId },
    });

    return (
        <>
            <AccommodationDetail data={data} refetch={refetch} />
            <QuestionWrite isEdit={false} />
            <QuestionList data={data} questionData={questionData} />
        </>
    );
};

export default AccommodationDetailPage;

import { FetchTravelproductQuery } from "@/commons/graphql/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export interface IAccommodationDetailProps {
    data: FetchTravelproductQuery;
    refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
}

export interface IUseAccommodationDetailProps extends IAccommodationDetailProps {}

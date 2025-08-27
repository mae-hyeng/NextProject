import {
    FetchTravelproductsOfTheBestQuery,
    FetchTravelproductsQuery,
} from "@/commons/graphql/graphql";
import {
    ApolloQueryResult,
    FetchMoreQueryOptions,
    OperationVariables,
    Unmasked,
} from "@apollo/client";

export interface IAccommodationListBaseProps {
    data: FetchTravelproductsQuery;
    refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;

    fetchMore: <TFetchData = any, TFetchVars extends OperationVariables = OperationVariables>(
        fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData> & {
            updateQuery?: (
                previousQueryResult: any,
                options: {
                    fetchMoreResult: Unmasked<TFetchData>;
                    variables: TFetchVars;
                }
            ) => any;
        }
    ) => Promise<ApolloQueryResult<TFetchData>>;
}

export type IUseAccommodationListProps = IAccommodationListBaseProps;

export interface IAccommodationListProps extends IAccommodationListBaseProps {
    bestProducts: FetchTravelproductsOfTheBestQuery;
}

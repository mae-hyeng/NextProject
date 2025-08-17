import _ from "lodash";

export const useBookmark = ({ refetch }) => {
    const getDebounce = _.debounce((value) => {
        refetch({ search: value, page: 1 });
    }, 500);

    const onChangeKeyword = (e) => {
        getDebounce(e.target.value);
    };

    return {
        onChangeKeyword,
    };
};

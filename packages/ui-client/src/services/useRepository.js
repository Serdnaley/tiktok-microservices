import { reactive } from 'vue';

export const useRepository = ({
  fetchData: fetchDataFunc,
}) => {
  const state = reactive({
    isLoading: false,
    data: [],
    total: null,
    page: 1,

    get isEnd () {
      return this.total && this.data && this.data.length >= this.total;
    },
  });

  const fetchData = async () => {
    state.isLoading = true;

    const { data, total } = await fetchDataFunc({ page: state.page });
    state.data = data || [];
    state.total = total;

    state.isLoading = false;
  };

  const loadMore = async () => {
    state.isLoading = true;

    state.page++;
    const { data, total } = await fetchDataFunc({ page: state.page });
    state.data.push(...data);
    state.total = total;

    state.isLoading = false;
  };

  return {
    state,
    fetchData,
    loadMore,
  };
};

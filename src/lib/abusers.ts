import { reactive } from "vue";
import * as api from "./api";

export const abusers = reactive<{
  loading: boolean;
  data: Abuser[];
}>({
  loading: true,
  data: [],
});

export async function fetchAbusers() {
  abusers.loading = true;
  try {
    const data = await api.get<Abuser[]>();
    abusers.data = data;
  } catch (error) {
    console.error(error);
  } finally {
    abusers.loading = false;
  }
}

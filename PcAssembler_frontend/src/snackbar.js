import { reactive } from 'vue';

export const snackbar = reactive({
  show: false,
  text: '',
  color: 'success',
});

export function showSnackbar(text, color = 'success') {
  snackbar.text = text;
  snackbar.color = color;
  snackbar.show = true;
}

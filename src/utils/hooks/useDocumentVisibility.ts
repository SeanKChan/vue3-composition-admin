import { ref } from 'vue'

type VisibilityState = 'hidden' | 'visible' | 'prerender' | undefined;

function useDocumentVisibility() {
  const documentVisibility = ref<VisibilityState>(document.visibilityState)
  document.addEventListener('visibilitychange', function () {
    documentVisibility.value = document.visibilityState
  })
  return documentVisibility
}

export default useDocumentVisibility

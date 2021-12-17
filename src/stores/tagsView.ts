import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import { RouteLocationNormalized } from 'vue-router'

export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string
}

export interface TagsViewState {
  visitedViews: TagView[]
  cachedViews: (string | undefined)[]
}

export const useTagsViewStore = defineStore('tagViews', () => {
  const state: TagsViewState = reactive({
    visitedViews: [],
    cachedViews: []
  })

  function addVisitedView(view: TagView) {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta?.title || 'no-name'
      })
    )
  }

  function addCachedView(view: TagView) {
    if (view.name === null) return
    if (state.cachedViews.includes(view.name?.toString())) return
    if (!view.meta?.noCache) {
      state.cachedViews.push(view.name?.toString())
    }
  }

  function delVisitedView(view: TagView) {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  }

  function delCachedView(view: TagView) {
    if (view.name === null) return
    const index = state.cachedViews.indexOf(view.name?.toString())
    index > -1 && state.cachedViews.splice(index, 1)
  }

  function delOthersVisitedView(view: TagView) {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta?.affix || v.path === view.path
    })
  }

  function delOthersCachedView(view: TagView) {
    if (view.name === null) return
    const index = state.cachedViews.indexOf(view.name?.toString())
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  }

  function delAllVisitedViews() {
    const affixTags = state.visitedViews.filter(tag => tag.meta?.affix)
    state.visitedViews = affixTags
  }

  function delAllCachedViews() {
    state.cachedViews = []
  }

  function updateVisitedView(view: TagView) {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }

  function addView(view: TagView) {
    addVisitedView(view)
    addCachedView(view)
  }

  function delView(view: TagView) {
    delVisitedView(view)
    delCachedView(view)
  }

  function delOtherViews(view: TagView) {
    delOthersVisitedView(view)
    delOthersCachedView(view)
  }

  function delAllViews() {
    delAllVisitedViews()
    delAllCachedViews()
  }

  return {
    ...toRefs(state)
  }
})

import { hasOwn } from '@vue/shared'
import {
  API_HIDE_TAB_BAR,
  API_HIDE_TAB_BAR_RED_DOT,
  API_REMOVE_TAB_BAR_BADGE,
  API_SET_TAB_BAR_BADGE,
  API_SET_TAB_BAR_ITEM,
  API_SET_TAB_BAR_STYLE,
  API_SHOW_TAB_BAR,
  API_SHOW_TAB_BAR_RED_DOT,
  API_TYPE_HIDE_TAB_BAR,
  API_TYPE_HIDE_TAB_BAR_RED_DOT,
  API_TYPE_REMOVE_TAB_BAR_BADGE,
  API_TYPE_SET_TAB_BAR_BADGE,
  API_TYPE_SET_TAB_BAR_ITEM,
  API_TYPE_SET_TAB_BAR_STYLE,
  API_TYPE_SHOW_TAB_BAR,
  API_TYPE_SHOW_TAB_BAR_RED_DOT,
  defineAsyncApi,
  HideTabBarProtocol,
  HideTabBarRedDotOptions,
  HideTabBarRedDotProtocol,
  RemoveTabBarBadgeOptions,
  RemoveTabBarBadgeProtocol,
  SetTabBarBadgeOptions,
  SetTabBarBadgeProtocol,
  SetTabBarItemOptions,
  SetTabBarItemProtocol,
  SetTabBarStyleOptions,
  SetTabBarStyleProtocol,
  ShowTabBarProtocol,
  ShowTabBarRedDotOptions,
  ShowTabBarRedDotProtocol,
} from '@dcloudio/uni-api'
import { useTabBar } from '../../../framework/plugin/state'
const setTabBarItemProps = ['text', 'iconPath', 'selectedIconPath']
const setTabBarStyleProps = [
  'color',
  'selectedColor',
  'backgroundColor',
  'borderStyle',
]
const setTabBarBadgeProps = ['badge', 'redDot']

function setProperties(
  item: Record<string, any>,
  props: string[],
  propsData: Record<string, any>
) {
  props.forEach(function (name) {
    if (hasOwn(propsData, name)) {
      item[name] = propsData[name]
    }
  })
}

function normalizeRoute(
  index: number,
  oldPagePath: string,
  newPagePath: string
) {
  const oldTabBarRoute = __uniRoutes.find(
    (item) => item.meta.route === oldPagePath
  )
  if (oldTabBarRoute) {
    const { meta } = oldTabBarRoute
    delete meta.tabBarIndex
    meta.isQuit = meta.isTabBar = false
  }
  const newTabBarRoute = __uniRoutes.find(
    (item) => item.meta.route === newPagePath
  )
  if (newTabBarRoute) {
    const { meta } = newTabBarRoute
    meta.tabBarIndex = index
    meta.isQuit = meta.isTabBar = false
  }
}

function setTabBar(
  type: string,
  args: Record<string, any>,
  resolve: () => void
) {
  const tabBar = useTabBar()!
  switch (type) {
    case API_SHOW_TAB_BAR:
      tabBar.shown = true
      break
    case API_HIDE_TAB_BAR:
      tabBar.shown = false
      break
    case API_SET_TAB_BAR_ITEM:
      const { index } = args
      const tabBarItem = tabBar.list[index]
      const oldPagePath = tabBarItem.pagePath
      setProperties(tabBarItem, setTabBarItemProps, args)
      const { pagePath } = args
      if (pagePath && pagePath !== oldPagePath) {
        normalizeRoute(index, oldPagePath, pagePath)
      }
      break
    case API_SET_TAB_BAR_STYLE:
      setProperties(tabBar, setTabBarStyleProps, args)
      break
    case API_SHOW_TAB_BAR_RED_DOT:
      setProperties(tabBar.list[args.index], setTabBarBadgeProps, {
        badge: '',
        redDot: true,
      })
      break
    case API_SET_TAB_BAR_BADGE:
      setProperties(tabBar.list[args.index], setTabBarBadgeProps, {
        badge: args.text,
        redDot: true,
      })
      break
    case API_HIDE_TAB_BAR_RED_DOT:
    case API_REMOVE_TAB_BAR_BADGE:
      setProperties(tabBar.list[args.index], setTabBarBadgeProps, {
        badge: '',
        redDot: false,
      })
      break
  }
  resolve()
}

export const setTabBarItem = defineAsyncApi<API_TYPE_SET_TAB_BAR_ITEM>(
  API_SET_TAB_BAR_ITEM,
  (args, { resolve }) => {
    setTabBar(API_SET_TAB_BAR_ITEM, args, resolve)
  },
  SetTabBarItemProtocol,
  SetTabBarItemOptions
)

export const setTabBarStyle = defineAsyncApi<API_TYPE_SET_TAB_BAR_STYLE>(
  API_SET_TAB_BAR_STYLE,
  (args, { resolve }) => {
    setTabBar(API_SET_TAB_BAR_STYLE, args, resolve)
  },
  SetTabBarStyleProtocol,
  SetTabBarStyleOptions
)

export const hideTabBar = defineAsyncApi<API_TYPE_HIDE_TAB_BAR>(
  API_HIDE_TAB_BAR,
  (args, { resolve }) => {
    setTabBar(API_HIDE_TAB_BAR, args, resolve)
  },
  HideTabBarProtocol
)

export const showTabBar = defineAsyncApi<API_TYPE_SHOW_TAB_BAR>(
  API_SHOW_TAB_BAR,
  (args, { resolve }) => {
    setTabBar(API_SHOW_TAB_BAR, args, resolve)
  },
  ShowTabBarProtocol
)
export const hideTabBarRedDot = defineAsyncApi<API_TYPE_HIDE_TAB_BAR_RED_DOT>(
  API_HIDE_TAB_BAR_RED_DOT,
  (args, { resolve }) => {
    setTabBar(API_HIDE_TAB_BAR_RED_DOT, args, resolve)
  },
  HideTabBarRedDotProtocol,
  HideTabBarRedDotOptions
)

export const showTabBarRedDot = defineAsyncApi<API_TYPE_SHOW_TAB_BAR_RED_DOT>(
  API_SHOW_TAB_BAR_RED_DOT,
  (args, { resolve }) => {
    setTabBar(API_SHOW_TAB_BAR_RED_DOT, args, resolve)
  },
  ShowTabBarRedDotProtocol,
  ShowTabBarRedDotOptions
)

export const removeTabBarBadge = defineAsyncApi<API_TYPE_REMOVE_TAB_BAR_BADGE>(
  API_REMOVE_TAB_BAR_BADGE,
  (args, { resolve }) => {
    setTabBar(API_REMOVE_TAB_BAR_BADGE, args, resolve)
  },
  RemoveTabBarBadgeProtocol,
  RemoveTabBarBadgeOptions
)

export const setTabBarBadge = defineAsyncApi<API_TYPE_SET_TAB_BAR_BADGE>(
  API_SET_TAB_BAR_BADGE,
  (args, { resolve }) => {
    setTabBar(API_SET_TAB_BAR_BADGE, args, resolve)
  },
  SetTabBarBadgeProtocol,
  SetTabBarBadgeOptions
)

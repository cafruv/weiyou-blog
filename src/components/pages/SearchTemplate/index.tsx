/**
 * pages/SearchTemplate
 * ContainerComponent
 * @package Component
 */
import React from 'react'
import { useRouter } from 'next/router'
/* components */
import { Presenter } from './Presenter'
/* contexts */
import { useBlogState } from '@/contexts/BlogContext'

/**
 * props
 */
type Props = {
  breadName: string
}

/**
 * container
 * @param props
 * @returns
 */
export const SearchTemplate: React.FC<Props> = (props: Props) => {
  const { breadName } = props
  const { blogList } = useBlogState()
  const router = useRouter()

  // 初期検索キーワード
  let queryText = ''
  if (router?.query?.keyword && typeof router.query.keyword === 'string') {
    queryText = router.query.keyword
  }

  // 検索ページで動的に変更する検索キーワード
  const [searchText, setSearchText] = React.useState(queryText)
  // 検索キーワードにHitしたブログ記事一覧
  const [showBlogList, setShowBlogList] = React.useState(blogList)

  /**
   * 動的検索キーワード更新処理
   * 更新時にブログリストの検索も同時実行
   * @param e React.ChangeEvent<HTMLInputElement>
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)

    const searctBlogList = blogList.filter((blog) => {
      // キーワード部分一致
      return blog.title.indexOf(e.target.value) > -1
    })
    setShowBlogList(searctBlogList)
  }

  React.useEffect(() => {
    // 画面遷移時のみurlのgetで渡ってきたキーワードで検索
    const searctBlogList = blogList.filter((blog) => {
      return blog.title.indexOf(queryText) > -1
    })
    setShowBlogList(searctBlogList)
  }, [queryText, blogList])

  return (
    <Presenter
      breadName={breadName}
      searchText={searchText}
      showBlogList={showBlogList}
      onChange={onChange}
    />
  )
}
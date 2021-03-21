/**
 * pages/PageTemplate
 * PresentationalComponent
 * @package Component
 */
import React from 'react'
/* components */
import { BaseTopPageLayout } from '@/components/layouts/BaseTopPagelayout'
import { BlogItem } from '@/components/common/molcules/BlogItem'
import { Pagination } from '@/components/common/molcules/Pagination'
/* constants */
import { blogShowCount } from '@/constants/config'
/* types */
import { BlogItemType } from '@/types/blog'

/**
 * props
 */
type Props = {
  blogList: BlogItemType[]
  totalCount: number
}

/**
 * presenter
 * @param props Props
 * @returns
 */
export const Presenter: React.FC<Props> = (props: Props) => {
  const { blogList, totalCount } = props

  return (
    <BaseTopPageLayout>
      {/* ブログ記事一覧表示 */}
      {blogList.map((blogItem, index) => (
        <BlogItem key={`${blogItem.id}_${index}`} blogItem={blogItem} />
      ))}

      {/* ページネーション */}
      {totalCount / blogShowCount > 1 && (
        <Pagination totalCount={totalCount} link="/page/" />
      )}
    </BaseTopPageLayout>
  )
}
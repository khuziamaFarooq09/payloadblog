import { CollectionConfig, FieldHook } from 'payload'
import { generateSlugHook } from './hooks/generate-slug-hook'
import { Article } from '@/payload-types'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import { generateContentSummaryHook } from './hooks/generate-content-summary-hook'

// fields
// title
// slug (auto-generated from title )
// content
// content summary (auto-filled from content: for SEO and articles cards)
// read-time-in-mins (auto-calculated from content)
// cover_image
// author (relationship to users collection)
// status (draft, published)
// published_at (only visible status is published)

export const Articles: CollectionConfig = {
    slug: 'articles',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            unique: true,
        },

        {
            name: 'Slug',
            type: 'text',
            required: true,
            unique: true,
            hooks: {
                beforeValidate: [generateSlugHook],
            },
        },

        {
            name: 'content',
            type: 'richText',
            required: true,
        },

        {
            name: 'contentSummary',
            type: 'textarea',
            required: true,
            hooks: { beforeValidate: [generateContentSummaryHook] },
        },

        {
            name: 'readTimeInMins',
            type: 'number',
            defaultValue: 0,
            hooks: {
                beforeChange: [
                    ({ siblingData }) => {
                        // ensure that the data is not stored in db
                        delete siblingData.readTimeInMins
                    },
                ],

                afterChange: [
                    () => {
                        const text = ''
                        const wordsPerMinute = 200
                        const words = text.trim().split(/\s+/).length
                        return Math.max(1, Math.ceil(words / wordsPerMinute))
                    },
                ],
            },
        },

        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },

        {
            name: 'author',
            type: 'relationship',
            relationTo: 'article-authors',
            required: true,
        },
    ],
}

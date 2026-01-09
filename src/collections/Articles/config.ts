import { CollectionConfig } from 'payload'
import { generateSlugHook } from './hooks/generate-slug-hook'

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
        },
    ],
}

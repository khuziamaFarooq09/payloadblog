import { CollectionConfig } from 'payload'

export const ArticleAuthor: CollectionConfig = {
    slug: 'article-authors',
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            unique: true,
        },

        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },

        {
            name: 'role',
            type: 'select',
            options: ['Staff Writer', 'Guest Author', 'Editor', 'Contributor', 'Flo Rida'],
            defaultValue: 'Staff Writer',
            required: true,
        },
    ],
}

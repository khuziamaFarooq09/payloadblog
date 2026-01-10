import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
        {
            name: 'blurDataURL',
            type: 'text',
            required: true,
            admin: {
                hidden: true,
            },
        },
    ],
    upload: true,
    hooks: {
        beforeChange: [
            ({ operation, data, req }) => {
                if (operation === 'create') return data

                // check for eligibility
                // if it is generate blur hash
                // set it to data.blurDataURL
                // return data
            },
        ],
    },
}

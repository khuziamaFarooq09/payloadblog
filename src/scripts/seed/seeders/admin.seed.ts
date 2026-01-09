import { getPayload } from 'payload'
import config from '@/payload.config'

export async function seedAdmin() {
    const payload = await getPayload({ config })

    try {
        const response = await payload.create({
            collection: 'users',
            data: {
                email: process.env.ADMIN_EMAIL!,
                password: process.env.ADMIN_PASSWORD,
            },
        })

        console.log('Admin user created:', response)
    } catch (error) {
        console.log('Error seeding admin user', error)
    }
}

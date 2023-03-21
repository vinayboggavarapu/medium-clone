import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'string',
    }),
    defineField({
      name: 'validate',
      title: 'Validate',
      type: 'boolean',
      description: 'Comments wont be visible until validation',
    }),
    defineField({
      name: 'view',
      type: 'reference',
      to: [{type: 'post'}],
    }),
  ],
})

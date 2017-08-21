<template>
  <ListItem>
    <p contenteditable="true">{{about}}</p>
  </ListItem>
</template>
<script>
  import ListItem from '@/components/list-item'

  export default {
    name: 'ListItemAbout',
    components: {
      ListItem
    },
    props: {
      about: {
        type: String,
        default: 'Please fill in here about me here .'
      }
    }
  }
</script>

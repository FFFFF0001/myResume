<template>
  <ListItem class="list-item-experience">
    <div class="heading">
      <span class="company" contenteditable="true">{{ company }}</span>
      <span class="job" contenteditable="true">{{ job }}</span>
      <span class="date" contenteditable="true">{{ date }}</span>
    </div>
    <p contenteditable="true">{{intro}}
    </p>
  </ListItem>
</template>
<script>
  import ListItem from './list-item'

  export default {
    name: 'ListItemExperience',
    components: {
      ListItem
    },
    props: {
      company: {
        type: String,
        default: '公司'
      },
      job: {
        type: String,
        default: '岗位'
      },
      date: {
        type: String,
        default: '时间 '
      },
      intro: {
        type: String,
        default: '工作内容'
      }
    }
  }
</script>
<style lang="less">
  .list-item-experience {
    .heading {
      font-size: 18px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      .company {
        width: 40%
      }
      .job {
        width: 35%;
      }
      .date {
        width: 25%;
        text-align: right;
      }
    }
  }
</style>

<template>
  <ListItem class="list-item-skill">
    <span class="title" name="percent">{{title}}</span>
    <span class="line">
      <span class="show" :style="{ width: percent + '%', background: selectColor }"></span>
    </span>
    <span class="input" style="margin-left:10px">
      <span class="percent">{{percent}}%</span>
    </span>
  </ListItem>
</template>

<script>
  import ListItem from './list-item'

  export default {
    name: 'ListItemSkill',
    components: {
      ListItem
    },
    props: {
      title: {
        type: String,
        default: 'JavaScript'
      },
      percent: {
        type: Number,
        default: 100
      }
    },
    data: function () {
      return {
        colors: ['#41b883', '#2883c6', '#f49b16', '#e62120', '#33475c', '#cc146f']
      }
    },
    computed: {
      selectColor: function () {
        let index = Math.floor(Math.random() * this.colors.length)
        return this.colors[index]
      }
    }
  }
</script>
<style lang="less">
  .list-item-skill {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    font-size: 20px;
    input {
      border: none;
      font-size: 20px;
    }
    .title {
      width: 130px;
    }
    input.percent {
      width: 30px;
      text-align: right;
    }
    span.line {
      position: relative;
      display: inline-block;
      width: 520px;
      height: 8px;
      background-color: #c2c2c2;
      .show {
        content: '';
        position: absolute;
        height: 100%;
      }
    }
  }
</style>

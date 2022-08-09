<template>
    <el-card :body-style="{ padding: '0px'}" style="width: 170px" shadow="hover">
        <img
          :src="teamAvatar"
          class="image"
          style="width: 170px; height: 100px; object-fit: cover"
        />
        <div class="middle" style="padding: 14px">
          <span class="text" style="width: 120px">{{name}}</span>
        </div>
    </el-card> 
</template>

<script>
export default {
    name: 'AverageCard',

    data() {
        return {
            teamAvatar: 'https://us.123rf.com/450wm/kaisorn/kaisorn1507/kaisorn150700059/43462346-office-workplace-flat-design.jpg',
        }
    },

    props:['name'],
}
</script>

<style>
.bottom {
  margin-bottom: 8px;
  margin-right: 5px;
  float:right
}

.middle{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 0px;
}

.image {
  width: 100%;
  display: block;
}

.text{
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: "Microsoft Yahei";
    
}
</style>
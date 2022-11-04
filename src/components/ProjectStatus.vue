<template>
  <!-- <div>{{ $route.params.id }}</div> -->
  <div>
    <div style="width: 33%; float: left" ref="contrib"></div>
    <!-- <div style="width: 33%;float: left">
        <ve-pie :data="chartData" height="380px"
                :settings="commitPieSettings" :title="{text: '提交数'}" :legend="{left:80}"></ve-pie>
      </div>
      <div style="width: 33%;float: left">
        <ve-pie :data="chartData" height="380px"
                :settings="modifyPieSettings" :title="{text: '代码数'}" :legend="{left:80}"></ve-pie>
      </div> -->
  </div>
</template>
<script>
  import { ref, onMounted, getCurrentInstance } from 'vue'

  async function getBranchData(branch) {
    let pageNo = 1
    const pageSize = 100
    let currentPageSize = 0
    let data = []
    do {
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.get(
        `https://gitee.com/api/v5/repos/${this.owner}/${this.repo}/commits`,
        {
          params: {
            access_token: this.token,
            sha: branch,
            page: pageNo,
            per_page: pageSize,
          },
        }
      )
      currentPageSize = response.data.length
      data = data.concat(response.data)
      // console.log(pageNo, data);
      pageNo += 1
    } while (currentPageSize === pageSize)
    // compute begin
    // console.log(data);
    data.forEach((commit) => {
      const loginName = commit.author ? commit.author.login : ''
      if (loginName in this.authors) {
        const author = this.authors[loginName]
        author.commit += 1
        if (commit.stats.total < 1000) {
          author.modify += commit.stats.total
        }
      }
    })
    this.chartData.rows = []
    Object.keys(this.authors).forEach((user) => {
      // console.log(user, authors[user].commit, authors[user].modify);
      const tmp = {
        user: this.authors[user].name,
        commit: this.authors[user].commit,
        modify: this.authors[user].modify,
      }
      this.chartData.rows.push(tmp)
    })
  }
  async function getData() {
    // https://gitee.com/api/v5/repos/{owner}/{repo}/branches
    const response = await axios.get(
      `https://gitee.com/api/v5/repos/${this.owner}/${this.repo}/branches`,
      {
        params: {
          access_token: this.token,
        },
      }
    )
    response.data.forEach((branch) => {
      // branches.push(branch.name);
      getBranchData.bind(this)(branch.name)
    })
  }

  export default {
    props: ['project'],
    setup({ project }) {
      const myChart = ref(null)
      // console.log(project)
      onMounted(() => {
        const { proxy: _this } = getCurrentInstance()

        let chart = _this.$root.echarts.init(contrib)
        // 绘制图表
        chart.setOption({
          title: { text: '总用户量' },
          tooltip: {},
          xAxis: {
            data: ['12-3', '12-4', '12-5', '12-6', '12-7', '12-8'],
          },
          yAxis: {},
          series: [
            {
              name: '用户量',
              type: 'line',
              data: [5, 20, 36, 10, 10, 20],
            },
          ],
        })
      })
      return {
        myChart,
      }
    },
  }
</script>

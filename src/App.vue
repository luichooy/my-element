<template>
  <div id="app">
    <radio v-model="fruit" label="apple" display="block">苹果</radio>
    <radio v-model="fruit" label="pear" display="block">梨</radio>
    
    <div style="margin-top: 50px;"></div>
    
    <radio-group v-model="sports" border display="block">
      <radio label="basketball">篮球</radio>
      <radio label="football">足球</radio>
      <radio label="tennis">网球</radio>
      <radio label="skateboard">滑板</radio>
    </radio-group>
    
    <div style="margin-top: 50px;"></div>
    
    <checkbox v-model="checked" @change="handleChange" :disabled="true"></checkbox>
    
    <div style="margin-top: 50px;"></div>
    
    <checkbox-group v-model="name" @change="handleChange" size="medium" block>
      <checkbox label="张三"></checkbox>
      <checkbox label="李四"></checkbox>
      <checkbox label="王五"></checkbox>
      <checkbox label="赵六"></checkbox>
    </checkbox-group>
    
    <div style="margin-top: 50px;"></div>
    
    <div>
      <tag>标签一</tag>
      <tag type="success">标签二</tag>
      <tag type="info">标签三</tag>
      <tag type="warning">标签四</tag>
      <tag type="danger">标签五</tag>
    </div>
    
    <div style="margin-top:16px;">
      <tag>默认标签</tag>
      <tag size="medium">medium</tag>
      <tag size="small">small</tag>
      <tag size="mini">mini</tag>
    </div>
    
    <div style="margin-top:16px;">
      <tag color="tan">默认标签</tag>
    </div>
    <div style="margin-top:16px;">
      <tag
        v-for="(tag,index) in tags"
        :key="index"
        :type="tag.type"
        closable
        @close="handleClose(tag)"
      >
        {{tag.name}}
      </tag>
    </div>
    <div style="margin-top:16px;">
      <el-tag>el-tag</el-tag>
    </div>
    
    <div style="margin-top:16px;width: 216px;">
      <el-scrollbar
        tag="ul"
        wrap-class="el-select-dropdown__wrap"
        view-class="el-select-dropdown__list"
      >
        <li>asdfasdff</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
      </el-scrollbar>
    </div>
    
    <div style="margin-top:16px;">
      <el-select v-model="letter" clearable>
        <el-option value="a">a</el-option>
        <el-option value="b">b</el-option>
        <el-option value="c">c</el-option>
        <el-option value="d">d</el-option>
        <el-option value="e">e</el-option>
        <el-option value="f">f</el-option>
        <el-option value="g">g</el-option>
        <el-option value="h">h</el-option>
        <el-option value="i">i</el-option>
        <el-option value="j">j</el-option>
        <el-option value="k">k</el-option>
        <el-option value="l">l</el-option>
        <el-option value="m">m</el-option>
        <el-option value="n">n</el-option>
        <el-option value="o">o</el-option>
        <el-option value="p">p</el-option>
        <el-option value="q">q</el-option>
        <el-option value="r">r</el-option>
        <el-option value="s">s</el-option>
        <el-option value="t">t</el-option>
      </el-select>
    </div>
    
    <div style="margin-top:16px;">
      <yto-select v-model="yto" clearable>
        <yto-option value="f1"></yto-option>
        <yto-option value="f2"></yto-option>
        <yto-option value="f3"></yto-option>
        <yto-option value="f4"></yto-option>
        <yto-option value="f5"></yto-option>
        <yto-option value="f6"></yto-option>
        <yto-option value="f7"></yto-option>
        <yto-option value="f8"></yto-option>
        <yto-option value="f9"></yto-option>
        <yto-option value="f10"></yto-option>
        <yto-option value="f11"></yto-option>
        <yto-option value="f12"></yto-option>
        <yto-option value="f13"></yto-option>
        <yto-option value="f14"></yto-option>
        <yto-option value="f15"></yto-option>
        <yto-option value="f16"></yto-option>
        <yto-option value="f17"></yto-option>
        <yto-option value="f18"></yto-option>
      </yto-select>
      
      <yto-select v-model="ytoGroup">
        <yto-option-group v-for="group in groupOptions" :key="group.label" :label="group.label">
          <yto-option v-for="option in group.options" :key="option.value"
            :label="option.label"></yto-option>
        </yto-option-group>
      </yto-select>
    </div>
    
  </div>
</template>

<script>
  import Radio from './components/Radio/Radio';
  import RadioGroup from './components/Radio/RadioGroup';
  import Checkbox from './components/Checkbox/Checkbox';
  import CheckboxGroup from './components/Checkbox/CheckboxGroup';
  import Tag from './components/Tag/Tag';
  import YtoSelect from './components/Select/Select';
  import YtoOption from './components/Select/Option';
  import YtoOptionGroup from './components/Select/OptionGroup';
  
  export default {
    name: 'app',
    
    componentName: 'App',
    
    components: {
      Radio,
      RadioGroup,
      Checkbox,
      CheckboxGroup,
      YtoSelect,
      YtoOption,
      YtoOptionGroup,
      Tag
    },
    
    data() {
      return {
        fruit: 'apple',
        sports: 'tennis',
        checked: true,
        name: [ '赵六', '王五' ],
        tags: [
          {
            name: '标签一',
            type: ''
          }, {
            name: '标签二',
            type: 'success'
          }, {
            name: '标签三',
            type: 'info'
          }, {
            name: '标签四',
            type: 'warning'
          }, {
            name: '标签五',
            type: 'danger'
          }
        ],
        letter: '',
        yto: 'f3',
        ytoGroup: '',
        groupOptions: [
          {
            label: '热门城市',
            options: [
              {
                value: 'Shanghai',
                label: '上海'
              }, {
                value: 'Beijing',
                label: '北京'
              }
            ]
          }, {
            label: '城市名',
            options: [
              {
                value: 'Chengdu',
                label: '成都'
              }, {
                value: 'Shenzhen',
                label: '深圳'
              }, {
                value: 'Guangzhou',
                label: '广州'
              }, {
                value: 'Dalian',
                label: '大连'
              }
            ]
          }
        ]
      };
    },
    
    watch: {
      letter(value) {
        console.log(value);
      }
    },
    
    methods: {
      handleChange(val) {
        console.log(val);
      },
      handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
      }
    }
  };
</script>

<style lang="scss">
  #app {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 60px;
    
    .tag + .tag {
      margin-left: 10px;
    }
  }
</style>

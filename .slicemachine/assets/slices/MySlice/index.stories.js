import MyComponent from '../../../../slices/MySlice';

export default {
  title: 'slices/MySlice'
}


export const _Default = () => <MyComponent slice={{"variation":"default","name":"Default","slice_type":"my_slice","items":[{"content":{"link_type":"Web","url":"https://slicemachine.dev"}},{"content":{"link_type":"Web","url":"http://google.com"}}],"primary":{},"id":"_Default"}} />
_Default.storyName = 'Default'

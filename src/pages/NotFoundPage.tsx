import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>404 - ページが見つかりませんでした</h1>
      <p>お探しのページは存在しないか、移動した可能性があります</p>
      <button type="button" onClick={() => navigate('/')}>
        トップページに戻る
      </button>
    </div>
  )
}

export default NotFoundPage;


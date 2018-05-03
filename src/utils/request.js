import store from '../store'
import { buffers, eventChannel, END } from 'redux-saga'


/**
 * The request helper which reads the access_token from the redux state
 * and passes it in its HTTP request.
 *
 * @author Skylar Kong
 */

const getAuthHeaders = () => {
  const headers = new Headers()

  headers.append('Accept', 'application/json')
  headers.append('Authorization', `Bearer ${store.getState().oidc.user.access_token}`)

  return headers
}

const getManualAuthHeaders = () => {
  const headers = new Headers()

  headers.append('Accept', 'application/json')  
  headers.append('Authorization', `Bearer ${store.getState().client.user.data[0].access_token}`)

  return headers
}


export const apiRequest = (url, method = 'GET') => {

  const headers = getAuthHeaders()
  const options = {
    method,
    headers
  }

  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }))
}

export const apiManualRequest = (url, method = 'GET') => {

  const headers = getManualAuthHeaders()
  const options = {
    method,
    headers
  }

  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }))
}

export const registerPost = (url, body, method = 'POST') => {

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const options = {
    method,
    headers,
    body
  }
  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }))

}

export const apiPost = (url, body, method = 'POST') => {

  const headers = getAuthHeaders()
  headers.append('Content-Type', 'application/json')

  const options = {
    method,
    headers,
    body
  }
  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }))
}

export const apiManualPost = (url, body, method = 'POST') => {

  const headers = getManualAuthHeaders()
  headers.append('Content-Type', 'application/json')

  const options = {
    method,
    headers,
    body
  }  
  
  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }))
}

export const apiManualDelete = (url, body, method = 'DELETE') => {

  const headers = getManualAuthHeaders()
  headers.append('Content-Type', 'application/json')

  const options = {
    method,
    headers,
    body
  }
  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }))
}

export const createUploadFileChannel = (url, file, opt) =>  {
  return eventChannel(emitter => {
    const xhr = new XMLHttpRequest()
    let reader = new FileReader()

    const onProgress = (e) => {
      if (e.lengthComputable) {
        const progress = e.loaded / e.total
        emitter({ progress })
      }
    }

    const onFailure = () => {
      emitter({ err: new Error('Upload failed') })
      emitter(END)
    }

    xhr.upload.addEventListener('progress', onProgress)
    xhr.upload.addEventListener('error', onFailure)
    xhr.upload.addEventListener('abort', onFailure)

    xhr.onreadystatechange = () => {
      const { readyState, status } = xhr
      if (readyState === 4) {
        if (status === 200) {
          emitter({ success: true })
          emitter(END)
        }
        else {
          onFailure(null)
        }
      }
    }

    reader.onloadend = e => {
      const body = JSON.stringify({
        ...opt,
        filename: file.name,
        filetype: file.type,
        data: e.target.result
      })

      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.setRequestHeader('Authorization', `Bearer ${store.getState().oidc.user.access_token}`)
      xhr.send(body)
    }

    reader.readAsDataURL(file)


    return () => {
      xhr.upload.removeEventListener('progress', onProgress)
      xhr.upload.removeEventListener('error', onFailure)
      xhr.upload.removeEventListener('abort', onFailure)
      xhr.onreadystatechange = null
      xhr.abort()
    }
  }, buffers.sliding(2))
}

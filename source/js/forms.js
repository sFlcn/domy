export default async function submitFormHandler(event) {
  event.preventDefault();
  try {
    const response = await fetch(event.target.action, { method: 'POST', body: new FormData(event.target) });
    if (!response.ok) {
      throw new Error(`Ошибка при обращении к серверу: ${response.status} ${response.statusText}`);
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Ошибка обработки. Ответ не JSON');
    }
    const json = await response.json();
    if (json.result === 'success') {
      alert(json.info);
      event.target.reset();
    } else {
      console.log(json);
      throw new Error(json.info);
    }
  } catch (error) {
    alert(error);
  }
}

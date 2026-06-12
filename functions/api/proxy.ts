export async function onRequest(context: any) {
  const { request } = context;
  const url = new URL(request.url);
  
  // 브라우저가 보낸 쿼리 파라미터(?SERVICE=WFS&...)를 엘리데이터 지오서버 주소 뒤에 그대로 붙입니다.
  const targetUrl = "https://eledata.koelsa.or.kr/geoserver/koelsa/ows" + url.search;

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Brelev-App/1.0',
        'Accept': 'application/json'
      }
    });

    // 오리지널 응답 바디를 가지고 새로운 응답 객체를 생성합니다.
    const newResponse = new Response(response.body, response);
    
    // 내 웹앱 주소 어디서든 호출할 수 있도록 CORS 방어선을 구축합니다.
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS');
    
    return newResponse;
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

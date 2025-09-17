import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
    // 초기 Response 객체 생성 (다음 미들웨어/페이지로 요청을 이어서 전달)
    let supabaseResponse = NextResponse.next({
        request, // 현재 들어온 요청 정보가 담김.
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                // 요청에 담긴 쿠키들을 가져옴.
                getAll() {
                    return request.cookies.getAll();
                },
                // Supabase에서 새로 발급한 쿠키들을 요청과 응답 모두에 반영
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));

                    // 새 Response 객체 생성 후 쿠키 적용
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // 중요: auth.getUser()를 반드시 호출해야 함
    // 이 부분을 생략하면 사용자가 랜덤하게 로그아웃되는 문제가 발생할 수 있음

    const {
        data: { user },
    } = await supabase.auth.getUser(); // 아마 쿠키를 자동 참조 하는듯?
    // 로그인 안 된 사용자가 보호된 페이지 접근 시 로그인 페이지로 안내.
    const key = request.nextUrl.searchParams.get('key');

    if (
        !user &&
        //
        request.nextUrl.pathname.startsWith('/login') &&
        key !== process.env.ADMIN_KEY
    ) {
        // no user, potentially respond by redirecting the user to the login page
        const url = request.nextUrl.clone();
        url.pathname = '/404';
        return NextResponse.redirect(url);
    } else if (user && request.nextUrl.pathname.startsWith('/login')) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin';
        return NextResponse.redirect(url);
    }

    // 최종적으로 Supabase 클라이언트의 쿠키가 포함된 Response 반환
    // 새로운 Response를 만들 경우 반드시:
    // 1. request 포함
    // 2. 기존 쿠키 복사
    // 3. 필요한 수정 후 반환
    // 이를 지키지 않으면 브라우저와 서버 세션 불일치로 인해
    // 사용자가 갑자기 로그아웃될 수 있음

    return supabaseResponse;
}

package top.jayu.exam.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
//import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import top.jayu.exam.util.StringUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * 安全处理
 * Created by Jay on 2019/11/27 9:19
 */

@Component
public class SecurityHandler implements HandlerInterceptor {

//    @Autowired
//    RedisTemplate redisTemplate;
    @Value("${spring.profiles.active}")
    private String profile;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // 不拦截任何请求
        return true;



//        String url = request.getRequestURI();
//        if("/user/login".equals(url) || "//user/login".equals(url)){   // 登录不拦截
//            return true;
//        } else if(url.equals("/maintain/image")) {
//        	return true;
//        }
//
//        if("dev".equals(profile)){ // 开发环境下：在浏览器(h5)中测试要加上这个
//            String arc = request.getHeader("Access-Control-Request-Headers");
//            if(!StringUtil.isBlank(arc) && arc.endsWith("token,user-id")){  // 去掉跨域的
//                return true;
//            }
//        }
//        String userId = request.getHeader("user-id");
//        if(StringUtil.isBlank(userId)){  // 用户无权限
//            noPermission(response);
//            return false;
//        }
//        if(accessRedisAuth(userId, request)){
//            return true;
//        }else {
//            noPermission(response);
//            return false;
//        }
    }

    // 验证是否能通过redis
    private boolean accessRedisAuth(String userId, HttpServletRequest request){
        Map<String, Object> cache = null;
//        Map<String, Object> cache = redisTemplate.opsForHash().entries(userId);
        if(cache == null){
            return false;
        }
        String token = request.getHeader("token");
        String redisToken = (String) cache.get("token");
        if(StringUtil.isBlank(token)){
            return false;
        }
        if(token.equals(redisToken)){
            return true;
        }
        return false;
    }

    // 无权限
    private void noPermission(HttpServletResponse response){
        response.setStatus(489);
    }

}

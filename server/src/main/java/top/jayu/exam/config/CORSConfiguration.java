package top.jayu.exam.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.*;


/**
 * 之所以使用这个过期的mvc适配器，
 * 可以跨越并且可以支持/static/index.html作为默认首页
 */
@SuppressWarnings("deprecation")
@Configuration
public class CORSConfiguration extends WebMvcConfigurerAdapter {

    @Autowired
    SecurityHandler securityHandler;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("*")
                .allowedOrigins("*")
                .allowedHeaders("*");
        super.addCorsMappings(registry);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(securityHandler).addPathPatterns("/**");
    }

}

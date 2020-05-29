package top.jayu.exam.util;

import java.util.HashMap;
import java.util.Map;

public class ResultUtil {

    public static class Result{
        private Map<String, Object> map = new HashMap<>();
        private Map<String, Object> properties = new HashMap<>();
        private Map<String, Object> result = new HashMap<>();
        public Result build() {
            map.put("result", result);
            map.put("properties", properties);
            map.put("errorInfo", "");
            return this;
        }
        public Result rows(Object rows){
            result.put("rows", rows);
            return this;
        }
        public Result total(long total){
            result.put("total", total);
            return this;
        }
        public Result errorInfo(Object error){
            map.put("errorInfo", error);
            return this;
        }
        public Result property(String key, Object value){
            properties.put(key, value);
            return this;
        }
        public Map<String, Object> getResult(){
            return map;
        }
    }

    public static Result build(){
        return new Result().build();
    }

}

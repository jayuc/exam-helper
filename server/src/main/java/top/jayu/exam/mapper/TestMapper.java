package top.jayu.exam.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import top.jayu.exam.entry.Test;

import java.util.List;

@Mapper
public interface TestMapper {

    @Select(
            "select id,name from test"
    )
    List<Test> queryTest();

}

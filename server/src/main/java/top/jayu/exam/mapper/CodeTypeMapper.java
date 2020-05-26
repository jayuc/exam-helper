package top.jayu.exam.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import top.jayu.exam.entry.CodeType;

import java.util.List;

@Mapper
public interface CodeTypeMapper {

    @Select(
            "select id,code_type,code_type_name,enable_flag from t_code_type where enable_flag = 1"
    )
    List<CodeType> queryAll();

}
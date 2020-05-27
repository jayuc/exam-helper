package top.jayu.exam.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import top.jayu.exam.entry.Code;

import java.util.List;

@Mapper
public interface CodeMapper {

    int insert(Code record);

    int insertSelective(Code record);

    @Select(
            "select id,code_type,code_no,code_name,sort_index,enable_flag " +
            "from t_code " +
            "where enable_flag = 1 and code_type = #{type} " +
            "order by sort_index asc"
    )
    List<Code> queryByType(@Param("type") int type);

}
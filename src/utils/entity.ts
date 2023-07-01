/**
 * 从各种Entity列表中提取指定ID的元素
 * @taskParam entityList 实体列表
 * @taskParam id entity.id
 */
export function getEntity(entityList: Entity[], id: number): any {
  let entity = {};
  entityList.forEach((value, index, array) => {
    if (value.id === id) {
      entity = value;
    }
  })

  return entity;
}

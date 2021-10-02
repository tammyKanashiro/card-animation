/* Random User API - https://randomuser.me/ */

export const loadData = async () => {
    let result;

    try {
        result = await $.ajax({
            url: 'https://randomuser.me/api/?results=10',
            type: 'GET',
            dataType: 'json',
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}
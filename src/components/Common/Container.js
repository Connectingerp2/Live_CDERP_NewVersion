const Container = ({ children, className = "", as: Tag = "div" }) => {
    return (
        <Tag className={`w-full max-w-[1800px] mx-auto ${className}`}>
            {children}
        </Tag>
    );
};

export default Container;